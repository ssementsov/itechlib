pipeline {
	agent any
	options {
		timestamps ()
	}
  stages {
     stage('Build') {	  
       steps {
	sh 'docker-compose up -d'
        sh 'docker run -it -p 3000:3000  lib'
      }	
    }
  }	  
}	
