pipeline {
	agent any
	options {
		timestamps ()
	}
  stages {
     stage('Build') {	  
	agent { dockerfile{ filename 'Dockerfile'
	                    args '--name build'
          		    }
	}		
      steps {
	sh 'docker build -f Dockerfile -t lib .'
        sh 'docker run -it -p 3000:3000  lib'
      }	
    }
  }	  
}	
