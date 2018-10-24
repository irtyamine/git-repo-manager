import packages from './packages';
import { find } from 'lodash'

  let data = (repositoryName, branch, body) => {
        let master = {};
        let development = {};
        let allModules = [];

      packages.forEach((moduleName) => {
           const detail = findVersionOfModule(body, moduleName);

          let currentDate = new Date();
          let datetime = currentDate.getDay() + "/" + (currentDate.getMonth() +1)
              + "/" + currentDate.getFullYear() + " @ "
              + currentDate.getHours() + ":"
              + currentDate.getMinutes() + ":" + currentDate.getSeconds();

           allModules.push({
               repo_name: repositoryName,
               timestamp: datetime,
               master: detail.master,
               development: detail.development
           })
      });


      function repoExist(modules, name) {
          const repo = find(modules, item => item.repo_name == name);
          return repo;
      }

      function findVersionOfModule(object, name) {
          for(let key in object) {
              if(typeof object[key] === "object") {
                  findVersionOfModule(object[key], name)
              }
              if (key === name && branch === 'master') {
                  master[name] = object[key];
              }
              if (key === name && branch === 'development') {
                  development[name] = object[key];
              }
          }
          return { master, development }
      }

      return allModules;
  };

  export default data;