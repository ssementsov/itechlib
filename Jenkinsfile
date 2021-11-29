pipeline {
	agent any
	options {
		timestamps ()
	}
  stages {
     stage('Build') {	  
       steps {
	sh 'docker build -f Dockerfile -t lib .'
        sh 'docker run -it -p 3000:3000  lib'
      }	
    }
  }	  
}	
