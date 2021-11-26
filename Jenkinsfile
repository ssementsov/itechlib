pipeline {
	agent any
	options {
		timestamps ()
	}
  stages {
     stage('Build') {	  
	agent {
	      dockerfile{ dir '/node' filename 'Dockerfile' args '--name node -p 3000:3000 -v dist:/dist'}
	}		
      steps {
	sh 'BUILD_ID=dontKillMe'      
        sh 'npm install --frozen-lockfile'
        sh 'npm run build'
        sh 'cd .next'
	sh '(npm run start&)'       
      }
   }
   
  }	  
}	
