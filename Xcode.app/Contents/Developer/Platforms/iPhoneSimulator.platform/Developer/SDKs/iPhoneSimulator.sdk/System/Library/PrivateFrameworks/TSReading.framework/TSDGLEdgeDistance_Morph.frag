// TSDGLEdgeDistance_Morph.frag
// Blends two distance textures together
#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D Texture;
uniform sampler2D Texture2;
uniform float Percent;
#if 0
uniform float EdgePercent; // In case we want this to be different, e.g. small -> large text
uniform float RelativeTextureFraction;
#endif
uniform float Opacity;
uniform vec4 Color;
uniform vec4 Color2;
#if 0
uniform vec4 OutgoingTextBounds;
uniform vec4 IncomingTextBounds;
#endif
varying vec2 v_TexCoord;
varying vec2 v_TexCoord2;
void main(void)
    float dist1 = texture2D(Texture, v_TexCoord).r;
    float dist2 = texture2D(Texture2, v_TexCoord2).r;
    vec4 result = mix(Color, Color2, Percent);
#if 0
    // For debugging and testing
    
    float thisEdgePercent = Percent;
    float edgePercentPower = clamp(RelativeTextureFraction, 0.25, 4.0);
    thisEdgePercent = pow(thisEdgePercent, edgePercentPower);
        
    float outAAScale = mix(1.0, RelativeTextureFraction, thisEdgePercent);
    float inAAScale = mix(1.0/RelativeTextureFraction, 1.0, thisEdgePercent);
    
    float mixedDist = mix(dist1 * outAAScale,
                          dist2 / inAAScale,
                          thisEdgePercent);
#else
    float mixedDist = mix(dist1, dist2,
    //0.0);
    //1.0);
    Percent);
#endif
    
    mixedDist += 0.5; // +0.5 to account for AA
    mixedDist = clamp(mixedDist, 0.0, 1.0);
    
    result *= Opacity * mixedDist;
    
#if 0
    // DEBUG: Paint outside TextBounds red or green
    // (Remember to un-ifdef the Uniform declarations above)
    
    if (any(lessThan(v_TexCoord, OutgoingTextBounds.xy)) ||
        any(greaterThan(v_TexCoord, OutgoingTextBounds.xy+OutgoingTextBounds.zw)))
    {
        result += vec4(1,0,0,0);
    }
    if (any(lessThan(v_TexCoord2, IncomingTextBounds.xy)) ||
        any(greaterThan(v_TexCoord2, IncomingTextBounds.xy+IncomingTextBounds.zw)))
    {
        result += vec4(0,1,0,0);
    }
#endif
    
    gl_FragColor = result;
    
#if 0
    // DEBUG: Draw entire distance field
    // (Remember to comment out the "clamp" line)
    float resultColor = mod(mixedDist/10.0, 1.0);
    vec2 resultVec = mixedDist > 0.0 ? vec2(1,0) : vec2(0,1);
    gl_FragColor = vec4(vec2(abs(resultColor * resultVec)), 0, 1);
#endif
    
#if 0
    // DEBUG: Draw texcoords as color
    gl_FragColor = vec4(v_TexCoord2, 0, 1);
#endif
    
