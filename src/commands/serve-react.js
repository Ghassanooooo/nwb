import path from 'path'

import glob from 'glob'

import serveReact from '../serveReact'

export default function(args) {
  if (args._.length === 1) {
    console.log(`usage: nwb serve-react <entry module>`)
  }
  let entry = args._[1]
  if (glob.sync(entry).length === 0) {
    console.error(`entry module not found: ${path.join(process.cwd(), entry)}`)
    process.exit(1)
  }

  serveReact(args, {
    entry,
    output: {
      filename: 'app.js',
      path: __dirname,
      publicPath: '/'
    },
    plugins: {
      html: {
        template: require.resolve('html-webpack-template/index.html'),
        appMountId: args['mount-id'] || 'app',
        mobile: true,
        title: args.title || 'serve-react'
      }
    }
  })
}