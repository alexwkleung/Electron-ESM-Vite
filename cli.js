#!/usr/bin/env node

import chokidar from 'chokidar'
import { exec } from 'child_process'
import * as fs from 'fs'
import process from 'process'

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
    'src/electron/expose-api/**/*.mts',
    'src/electron/**/*.ts',
    'src/electron/**/*.mts',
    'src/electron/**/*.d.ts',
    'src/electron/**/*.html',
    'src/electron/**/*',
    'src/**/*',
    'src/assets/*.css',
    'src/assets/*.scss'
];

const chokidarPathsIgnore = []

const chokidarDev = () => {
    try {
        fs.open('.hmr_pid.txt', 'w', (err, fd) => {
            if (err) {
                throw err;
            }
    
            fs.close(fd, (err) => {
                if (err) {
                    throw err;
                }
            }) 
        })
    } catch (e) {
        console.error(e);
    }

    console.log("HMR is active");

    chokidar.watch(chokidarPaths, { ignored: chokidarPathsIgnore }).on('all', (event, path) => {
        if(event === 'change' && path !== null && path !== undefined) {
            console.log("File changed: " + path);

            console.log("Rebuilding files...");

            try {                  
                exec('npm run build').on('exit', () => {
                    fs.readFile('.hmr_pid.txt', { encoding: 'utf-8' }, (err, data) => {
                        if (err) {
                            throw err;
                        }
                        
                        process.kill(data);
                    })

                    console.log("Restarting Electron process...");
                    exec('npm run electron');
                });
            } catch (e) {
                console.error(e);
            }    
        }
    })
}
chokidarDev();