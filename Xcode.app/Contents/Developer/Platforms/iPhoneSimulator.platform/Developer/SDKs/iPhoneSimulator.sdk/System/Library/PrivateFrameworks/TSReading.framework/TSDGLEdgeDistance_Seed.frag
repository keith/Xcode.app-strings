// TSDGLEdgeDistance_Seed.frag
// Seeds initial distance texture
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D Texture;
uniform float TextureLevels;
uniform float Invert;
varying vec2 v_TexCoord;
// Remaps integers [0,TextureLevels] to floats [-1,+1]
vec2 remap(vec2 floatdata) {
    return floatdata * (TextureLevels-1.0) / TextureLevels * 2.0 - 1.0;
void main( void )
    float texel = texture2D(Texture, v_TexCoord).a;
    if (Invert > 0.0) {
        texel = 1.0 - texel;
    }
    float myzero = 0.5 * TextureLevels / (TextureLevels - 1.0); // Represents zero
    float myinfinity = 0.0;                             // Represents infinity
    float aadist = texel;                               // Sub-pixel AA distance
    // Pixels > 0.5 are objects, others are background
    gl_FragColor = vec4(vec2(texel > 0.99999 ? myinfinity : myzero), aadist, 1.0);
    
    //    // DEBUG
    //    gl_FragColor = texture2D(Texture, v_TexCoord);
