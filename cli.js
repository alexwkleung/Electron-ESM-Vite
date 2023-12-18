#!/usr/bin/env node

import chokidar from 'chokidar'
import { exec } from 'child_process'
import * as fs from 'fs'

const chokidarPaths = [
    'src/electron/main.ts', 
    'src/electron/renderer/renderer.ts', 
    'src/electron/renderer/*.ts',
    'src/electron/renderer/**/*.ts',
    'src/electron/preload/preload.mts', 
    'src/electron/preload/preload.d.ts', 
    'index.html', 
    'src/electron/expose-api/*.d.ts',
    'src/electron/expose-api/**/*.d.ts',
    'src/electron/expose-api/*.mts',
    'src/electron/expose-api/**/*.mts'
];

const chokidarDev = () => {
    fs.open('.hmr_pid.txt', 'w', (err, fd) => {
        if(err) {
            throw console.error(err);
        }
        
        fs.close(fd, (err) => {
            if(err) {
                throw console.error(err);
            }
        })
    })

    console.log("HMR is active");

    chokidar.watch(chokidarPaths).on('all', (event, path) => {
        if(event === 'change' && path !== null && path !== undefined) {
            console.log("File changed: " + path);

            console.log("Rebuilding files...");

            try {                  
                exec('npm run build').on('exit', () => {
                    fs.readFile('.hmr_pid.txt', { encoding: 'utf-8' }, (err, data) => {
                        if(err) {
                            throw console.error(err);
                        } else {
                            process.kill(data);
                        }
                    })

                    console.log("Restarting Electron process...");
                    exec('npm run electron');
                });
            } catch(e) {
                throw console.error(e);
            }    
        }
    })
}
chokidarDev();