pipeline {
          agent none
           options {
		timestamps ()
	    } 
	
	stages{
		     stage('Create docker'){
				agent{
				    dockerfile{  
					        filename './React/Dockerfile'
	                        args '--name yarn -v exchange:/exchange  '
					  	
				    }
	            }
	           		 stages{
	                		stage('Build'){
						steps{
						                sh '''
								npm install
								npm run build
						                cp -r public/* /exchange
						                '''
							    	}
	                		}
				    }
			}	    
		    stage('Nginx'){
		      agent any
           		 stages{
                		stage('Start Nginx'){
                    			steps{
				                 sh '''
		 			              	docker-compose up -d ''' 
			    	        }
                             }
			}	 
		 
		   }
		}	
	}    
