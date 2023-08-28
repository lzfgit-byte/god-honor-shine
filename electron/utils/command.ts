import * as process from 'node:child_process';
import type { ExecException } from 'node:child_process';
import { sendMessage } from './message';
export const exec = (commond: string) => {
  return new Promise((resolve, reject) => {
    process.exec(commond, (error: ExecException, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
};

export const killByPort = (portToKill: number) => {
  const exec = process.exec;

  const findProcessCommand = `netstat -ano | findstr :${portToKill}`;
  const killProcessCommand = `taskkill /F /PID`;
  return new Promise((resolve, reject) => {
    exec(findProcessCommand, (error, stdout) => {
      if (error) {
        resolve('');
        sendMessage(`Error finding process:${error.message}`);
        return;
      }

      const lines = stdout.split('\n');
      if (lines.length > 0) {
        const parts = lines[0].trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(Number(pid))) {
          exec(`${killProcessCommand} ${pid}`, (killError, killStdout) => {
            if (killError) {
              reject();
              sendMessage(`Error killing process:`);
              return;
            }
            resolve('');
            sendMessage(`Process killed:${killStdout}`);
          });
        } else {
          resolve('');
          sendMessage(`No process found on port${portToKill}`);
        }
      } else {
        resolve('');
        sendMessage(`No process found on port${portToKill}`);
      }
    });
  });
};
