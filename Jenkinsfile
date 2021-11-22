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
								npm i eslint --save-dev
								npx install-peerdeps --dev eslint-config-airbnb
								npm i -D babel-eslint
								npm i -D eslint-config-prettier eslint-plugin-prettier
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
