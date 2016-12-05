// TSDGLEdgeDistance_Morph.vert
#ifdef GL_ES
precision highp float;
#endif
uniform mat3 TextureMatrix;
uniform mat3 Texture2Matrix;
uniform mat4 MVPMatrix;
attribute vec2 Position;
attribute vec2 TexCoord;
varying vec2 v_TexCoord;
varying vec2 v_TexCoord2;
void main( void )
    // Get the texture coordinates
    v_TexCoord = (TextureMatrix * vec3(TexCoord, 1)).xy;
    v_TexCoord2 = (Texture2Matrix * vec3(TexCoord, 1)).xy;
    gl_Position = MVPMatrix * vec4(Position, 0, 1);
