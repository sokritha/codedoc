import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        // build arg: represent bundling process (find files, loading up, join diff file, transpile, etc.)
        setup(build: esbuild.PluginBuild) {
            // listener: Resolve, onLoad
            // ------------------------------------------
            // find root entry file of 'index.js'
            build.onResolve({ filter: /(^index\.js$)/ }, (args) => {
              
                return { path: 'index.js', namespace: 'a' };
            })

            // find relative file
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                }
            })
            
            // find the root file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                }      
            });
        }
    }
}