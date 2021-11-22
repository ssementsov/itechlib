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
								npm i -D babel-eslint eslint-config-airbnb eslint eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
								npm run build
						                cp -r build/* /exchange
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
