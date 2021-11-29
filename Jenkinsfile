pipeline {
	agent any
	options {
		timestamps ()
	}
  stages {
	stage('Cloning our Git') {
		steps {
			git branch: 'Devops', url: 'https://github.com/ssementsov/itechlib'
		}
	}
     stage('Build') {	  
       steps {
	
	sh 'docker-compose up -d'
        sh 'docker run -it -p 3000:3000  lib'
      }	
    }
  }	  
}	
