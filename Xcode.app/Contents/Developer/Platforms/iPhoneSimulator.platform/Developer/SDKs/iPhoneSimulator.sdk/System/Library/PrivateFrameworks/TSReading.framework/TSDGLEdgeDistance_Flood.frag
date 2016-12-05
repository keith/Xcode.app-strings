// TSDGLEdgeDistance_Flood.frag
// Jump flooding algorithm
#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D Texture;
uniform vec2 TextureSize;
uniform float TextureLevels;
varying vec2 v_stepTexCoord;
varying vec2 v_TexCoord;
// Remaps integers [0,TextureLevels] to floats [-1,+1]
vec2 remap(vec2 floatdata) {
    return floatdata * (TextureLevels - 1.0) / TextureLevels * 2.0 - 1.0;
vec2 remap_inv(vec2 floatvec) {
    return (floatvec + 1.0)* 0.5 * TextureLevels / (TextureLevels - 1.0);
// Tests this texel against current values
//vec4 bestDistanceFromDirectionAndPreviousBest(vec2 delta, vec4 bestDistance)
// <rdar://problem/14910632>
#define updateBestDistanceDefine\
    vec2 newTexCoord = v_TexCoord + delta;\
    if (!(any(lessThan(newTexCoord, vec2(0.0, 0.0))) || any(greaterThan(newTexCoord, vec2(1.0, 1.0))))) {\
        vec3 texel = texture2D(Texture, newTexCoord).rgb;\
        vec4 testDistance = vec4(remap(texel.rg), 0,0);\
        if (testDistance.x > -0.99999) { /* if the new seed is not "indeterminate distance" */\
            testDistance.xy = testDistance.xy + delta;\
            testDistance.z = length(testDistance.xy) + (texel.b - 0.5)/TextureSize.x; /* Antialiased distance */\
            testDistance.w = texel.b; /* Original grayscale value */\
            if (testDistance.z < bestDistance.z) {\
                bestDistance = testDistance;\
            }\
        }\
    }\
void main( void )
    vec2 delta;
    vec3 texel = texture2D(Texture, v_TexCoord).rgb;
    vec4 bestDistance;
    bestDistance.xy = remap(texel.rg);
    // This AA calculation assumes TextureSize.x==TextureSize.y
    bestDistance.z = length(bestDistance.xy) + (texel.b - 0.5)/TextureSize.x;
    bestDistance.w = texel.b;
    
    delta = -v_stepTexCoord;
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    delta = vec2(-v_stepTexCoord.x, 0);
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    delta = vec2(-v_stepTexCoord.x, v_stepTexCoord.y);
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    delta = vec2(0, -v_stepTexCoord.y);
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    delta = vec2(0, v_stepTexCoord.y);
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    delta = vec2(v_stepTexCoord.x, -v_stepTexCoord.y);
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    delta = vec2(v_stepTexCoord.x, 0);
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    delta = v_stepTexCoord;
    updateBestDistanceDefine
    //bestDistance = bestDistanceFromDirectionAndPreviousBest(delta, bestDistance);
    
    gl_FragColor = vec4(remap_inv(bestDistance.xy), bestDistance.w, 1.0);
