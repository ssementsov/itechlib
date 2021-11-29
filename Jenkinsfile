pipeline {
	agent any
	options {
		timestamps ()
	}
  stages {
     stage('Build') {	  
	agent {
	      docker{ image 'node:16.13-buster' args '--name build  -v dist:/dist'}
	}		
      steps {
	sh 'npm install --frozen-lockfile'
        sh 'npm run build'
        sh 'cp .next /dist'
      }
   }
     stage('Deploy'){	 
	     agent {
	             dockerfile{ filename 'Dockerfile' args '--name nodelib  -v dist:/dist'}
	           }	
	     steps{
		 docker run -d --name lib -p 3000:3000 -v dist:/dist nodelib
	     }
     }
  }	  
}	
