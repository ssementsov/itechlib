pipeline {
	agent any
	options {
		timestamps ()
	}
  stages {
     stage('Build') {	  
	agent {
	      docker{image 'node:16.13-buster'
		     args '--name build  -v dist:/dist'}
	}		
      steps {
	sh 'npm install --frozen-lockfile'
        sh 'npm run build'
	sh 'cp package.json /dist'       
        sh 'cp -r .next/* /dist'
      }
   }
     stage('Deploy'){	 
	      steps{
		 sh 'docker run -d -it --name lib -p 3000:3000 -v dist:/dist -w /dist node:16.13-buster sh '
	     }
     }
  }	  
}	
