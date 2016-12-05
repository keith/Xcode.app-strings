// TSDGLEdgeDistance_Combine.frag
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D Texture; // Interior
uniform sampler2D Texture2; // Exterior
uniform vec2 TextureSize; // should be same size for both textures!
uniform float TextureLevels;
varying vec2 v_TexCoord;
// Remaps integers [0,TextureLevels] to floats [-1,+1]
vec2 remap(vec2 floatdata) {
    return floatdata * (TextureLevels - 1.0) / TextureLevels * 2.0 - 1.0;
vec2 remap_inv(vec2 floatvec) {
    return (floatvec + 1.0)* 0.5 * TextureLevels / (TextureLevels - 1.0);
void main( void )
    vec4 texel1 = texture2D(Texture, v_TexCoord);
    vec2 distvec1 = remap(texel1.rg);
    float dist1 = length(distvec1) + (texel1.b-0.5) / TextureSize.x;
    dist1 *= TextureSize.x;
    
    vec4 texel2 = texture2D(Texture2, v_TexCoord);
    vec2 distvec2 = remap(texel2.rg);
    float dist2 = length(distvec2) + (texel2.b-0.5) / TextureSize.x;
    dist2 *= TextureSize.x;
    
    // Interior is negative
    gl_FragColor.r = (abs(length(distvec1)) > 0.0) ? -dist1 : dist2;
    
