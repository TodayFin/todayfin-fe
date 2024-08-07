pipeline {
    agent any

    environment {
        REPO = 'KTB-LuckyVicky/todayfin-fe'
        ECR_REPO = '905418374604.dkr.ecr.ap-northeast-2.amazonaws.com/todayfin-fe'
        ECR_CREDENTIALS_ID = 'ecr:ap-northeast-2:ecr_credentials_id'
        ALPHA_VANTAGE_API_KEY = credentials('alpha_vantage_api_key')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: "https://github.com/${REPO}.git"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${ECR_REPO}:latest")
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    docker.withRegistry("https://${ECR_REPO}", "${ECR_CREDENTIALS_ID}") {
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy on Local Server') {
            steps {
                script {
                    // Jenkins 자격증명을 사용하여 Docker 로그인
                    docker.withRegistry("https://${ECR_REPO}", "${ECR_CREDENTIALS_ID}") {
                        //기존에 도커 컨테이너 삭제
                        sh "docker rm -f todayfin-fe"

                        // ECR에서 이미지 pull
                        sh "docker pull ${ECR_REPO}:latest"

                        // 도커 컨테이너 실행
                        sh "docker run -d -e ALPHA_VANTAGE_API_KEY=${ALPHA_VANTAGE_API_KEY} --name todayfin-fe -p 3000:3000 ${ECR_REPO}:latest"
                    }
                }
            }
        }
    }
}
