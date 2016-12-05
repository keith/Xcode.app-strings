// TSDGLEdgeDistance_Gradient.frag
// Computes the XY gradient of the R channel in the given Texture and sticks it into the GB channels
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D Texture;
uniform vec2 TextureSize; // Actually 1/TextureSize to avoid division
uniform float TextureLevels;
varying vec2 v_TexCoord;
varying vec2 v_stepTexCoord;
void main( void )
    float texel = texture2D(Texture, v_TexCoord).r;
    
    float texelXneg = texture2D(Texture, v_TexCoord + vec2(-1,0)*TextureSize).r;
    float texelXpos = texture2D(Texture, v_TexCoord + vec2(+1,0)*TextureSize).r;
    float texelYneg = texture2D(Texture, v_TexCoord + vec2(0,-1)*TextureSize).r;
    float texelYpos = texture2D(Texture, v_TexCoord + vec2(0,+1)*TextureSize).r;
    
    vec2 gradient = vec2(texelXpos - texelXneg, texelYpos - texelYneg) * 0.5;
    
    vec4 result = vec4(texel, gradient, 1);
    
    gl_FragColor = result;
    
