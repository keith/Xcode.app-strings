#! /usr/bin/env python
# Supercedes VerifyHeaders.py
import os, subprocess, sys, shutil, re, tempfile, multiprocessing
#def sdkpath(x):
if x.startswith('/'): x = x[1:]
#return os.path.join(self.sdkroot, x)
return '='+x
def printCmd(cmd):
print '$', ' '.join(cmd)
sys.stdout.flush()
return cmd
class Verifier:
def __init__(self):
self.workerPool = multiprocessing.Pool(multiprocessing.cpu_count())
self.lock = multiprocessing.Lock()
def Run(self, args):
self.tempdir = tempfile.mkdtemp()
try:
self.failures = 0
self.sdk = args.sdk
self.frameworkSearches = []
self.modules = args.modules
self.headers = args.headers
if args.archs:
self.archs = args.archs.split()
elif self.sdk and self.sdk.startswith('iphoneos'):
self.archs = ['armv7', 'arm64']
else:
self.archs = ['i386','x86_64']
if self.sdk:
self.sdkroot = subprocess.check_output(['xcodebuild','-version','-sdk',self.sdk,'Path']).strip()
print 'sdkroot=',self.sdkroot
else:
self.sdkroot = None
if args.lang:
self.lang = args.lang.split()
else:
self.lang = ['c','c++-header','objective-c-header','objective-c++-header']
if args.builddir:
self.frameworkSearches = ['-F'+args.builddir]
if not args.framework:
self.ScanBuildDir(args.builddir)
if args.framework:
for fw in args.framework:
self.VerifyFramework(fw)
self.workerPool.close()
self.workerPool.join()
if self.failures:
print '* * * * * FAILED * * * * *'
sys.exit(1)
else:
print '* * * * * SUCCESS * * * * *'
finally:
shutil.rmtree(self.tempdir)
def ScanBuildDir(self, builddir):
for item in os.listdir(builddir):
if item.endswith('.framework'):
path = os.path.join(builddir, item)
self.VerifyFramework(path)
def VerifyFramework(self, fw):
# fw is a path
if self.modules:
self.VerifyFrameworkModule(fw)
if self.headers:
if os.path.exists(os.path.join(fw, 'Headers')):
self.ScanHeaderDir(os.path.join(fw, 'Headers'))
if os.path.exists(os.path.join(fw, 'PrivateHeaders')):
self.ScanHeaderDir(os.path.join(fw, 'PrivateHeaders'))
def VerifyFrameworkModule(self, fw):
def forEachArch(cmdEnd):
for arch in self.archs:
cmd = ['xcrun']
if self.sdk: cmd += ['--sdk',self.sdk]
cmd += ['clang','-arch',arch]
if self.sdk: cmd += ['-isysroot',self.sdkroot]
cmd += self.frameworkSearches
cmd += cmdEnd
x = subprocess.call(printCmd(cmd))
if x:
self.failures += 1
break
fwname = os.path.splitext(os.path.basename(fw))[0]
tmpdir = '/tmp/VerifyFramework.tmp'
if os.path.exists(tmpdir):
shutil.rmtree(tmpdir)
os.makedirs(tmpdir)
if "c" in self.lang:
cfile = os.path.join(tmpdir, 'test.c')
f = open(cfile, 'w')
f.write("#include <%s/%s.h>\n" % (fwname, fwname))
f.close()
forEachArch([cfile,'-c','-fmodules'])
if "objective-c-header" in self.lang:
cfile = os.path.join(tmpdir, 'test.m')
f = open(cfile, 'w')
f.write("@import %s;\n" % fwname)
f.close()
forEachArch([cfile,'-c','-fmodules'])
sfile = os.path.join(tmpdir, 'test.swift')
f = open(sfile, 'w')
f.write("import %s\n" % fwname)
f.close()
cmd = ['xcrun']
if self.sdk: cmd += ['--sdk',self.sdk]
cmd += ['swift']
if self.sdk: cmd += ['-sdk',self.sdkroot]
cmd += [sfile]
x = subprocess.call(printCmd(cmd))
if x:
self.failures += 1
def ScanHeaderDir(self, dir):
for item in os.listdir(dir):
path = os.path.join(dir, item)
if not os.path.isdir(path):
if os.path.splitext(path)[1] == '.h':
self.VerifyHeader(path)
def VerifyHeader(self, path):
txt = open(path).read()
if "@end" in txt or "#import" in txt:
languages = [x for x in self.lang if x not in ('c','c++-header')]
else:
languages = self.lang
args = argparse.Namespace()
args.sdk = self.sdk
args.sdkroot = self.sdkroot
args.frameworkSearches = self.frameworkSearches
args.path = path
args.tempdir = self.tempdir
for args.arch in self.archs:
for args.lang in languages:
def callback(t):
output, resultcode = t
self.lock.acquire()
print output,
if resultcode:
self.failures += 1
self.lock.release()
#print 'calling...', args.__dict__
self.workerPool.apply_async(check1Header, (args, ), callback=callback)
def check1Header(args):
import StringIO
ostr = StringIO.StringIO()
resultcode = 0
#print 'check1Header', args
try:
ofile = os.path.join(args.tempdir, os.path.splitext(os.path.basename(args.path))[0] + ('-%d.o' % os.getpid()))
cmd = ['xcrun']
if args.sdk: cmd += ['--sdk', args.sdk]
cmd += ['clang', '-arch', args.arch]
if args.sdk: cmd += ['-isysroot', args.sdkroot]
cmd += args.frameworkSearches + ['-c', '-x', args.lang, args.path, '-o', ofile]
if 'c++' in args.lang:
cmd += ['--std=c++14']
p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
out, junk = p.communicate()
print >>ostr, '$', ' '.join(cmd)
ostr.write(out)
resultcode = p.returncode
if not resultcode and args.lang == 'c':
cmd = ['xcrun']
if args.sdk: cmd += ['--sdk', args.sdk]
cmd += ['nm', '-g', ofile]
print >>ostr, '$', ' '.join(cmd)
txt = subprocess.check_output(cmd, stderr=open('/dev/null', 'w'))
print >>ostr, txt
for m in re.finditer('[0-9a-fA-F]+\s+[ST]\s+(.*)', txt):
print 'error: header defines global function or data', m.group(1)
resultcode = 1
except:
import traceback
print >>ostr, traceback.format_exc()
resultcode = 1
s = ostr.getvalue()
#print 'returning results', s, resultcode
return (s, resultcode)
if __name__ == '__main__':
import argparse
if os.environ.has_key('SKIP_VERIFY_FRAMEWORK'):
print 'SKIP_VERIFY_FRAMEWORK set; exiting'
sys.exit(0)
# VerifyHeaders.py -sdk <sdkname> -framework <fw>
parser = argparse.ArgumentParser(description="Verify framework's module and that header files are independently compilable.")
parser.add_argument('-sdk',
help='SDK to compile against')
parser.add_argument('-archs',
help='architectures to build with (e.g. "i386 x86_64")')
parser.add_argument('-lang',
help='languages to build for (e.g. "c  c++-header  objective-c-header  objective-c++-header", default: all of these)')
parser.add_argument('-builddir',
help='build directory. If -framework not specified, this is scanned for frameworks. Otherwise this is added as a search path.')
parser.add_argument('-framework', action='append',
help='path to framework whose headers are to be checked')
parser.add_argument('-headers', action='store_true', default=False,
help="verify headers")
parser.add_argument('-modules', action='store_true', default=False,
help="verify modules")
args = parser.parse_args()
v = Verifier()
try:
v.Run(args)
except KeyboardInterrupt:
print '* * * Interrupted * * *'
sys.exit(1)
