// TSDGLEdgeDistance.vert
#ifdef GL_ES
precision highp float;
#endif
uniform mat4 MVPMatrix;
attribute vec2  Position;
attribute vec2 TexCoord;
varying vec2 v_TexCoord;
#ifdef INCLUDE_STEPTEXCOORD
uniform vec2 TextureSize;
uniform float Step;
varying vec2 v_stepTexCoord;
#endif
void main( void )
  // Get the texture coordinates
    v_TexCoord = TexCoord;
#ifdef INCLUDE_STEPTEXCOORD
    v_stepTexCoord = vec2(Step / TextureSize.x,
                          Step / TextureSize.y); // Saves a division in the fragment shader
#endif
    gl_Position = MVPMatrix * vec4(Position, 0, 1);
