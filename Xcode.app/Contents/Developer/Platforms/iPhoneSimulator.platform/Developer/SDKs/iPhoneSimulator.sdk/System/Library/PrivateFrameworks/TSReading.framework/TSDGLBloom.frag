// TSDGLBloom.frag
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D Texture;
uniform sampler2D BlurTexture;
uniform float BloomAmount;
varying vec2 v_TexCoord;
void main( void )
    vec4 color = texture2D(Texture, v_TexCoord);
    vec4 blurColor = texture2D(BlurTexture, v_TexCoord);
    //blurColor *= length(blurColor);
    
    color += (blurColor + color) * BloomAmount;
    
    //color = v_TexCoord.x < 0.5 ? color : blurColor;
    //color = min(vec4(1), color);
    gl_FragColor = color;
    
