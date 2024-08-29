pipeline {
    agent any

    environment {
        REPO = 'KTB-LuckyVicky/todayfin-fe'
        ECR_REPO = '905418374604.dkr.ecr.ap-northeast-2.amazonaws.com/todayfin-fe'
        ECR_CREDENTIALS_ID = 'ecr:ap-northeast-2:ecr_credentials_id'
        ALPHA_VANTAGE_API_KEY = credentials('alpha_vantage_api_key')
        HUGGINGFACE_API_KEY = credentials('huggingface_api_key')
        ALPHA_VANTAGE_BACKEND_URL = credentials('alpha_vantage_backend_url')
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
                        sh "docker run -d -e ALPHA_VANTAGE_API_KEY=${ALPHA_VANTAGE_API_KEY} -e HUGGINGFACE_API_KEY=${HUGGINGFACE_API_KEY} -e ALPHA_VANTAGE_BACKEND_URL=${ALPHA_VANTAGE_BACKEND_URL} --name todayfin-fe -p 3000:3000 ${ECR_REPO}:latest"

                        // Docker 이미지 리스트를 가져오고, <none> 태그 이미지 정렬 및 필터링
                        // 최신 5개를 제외한 이미지 ID 추출
                        sh "docker images --format '{{.ID}} {{.CreatedAt}}' | grep '<none>' | sort -r -k 2 | tail -n +6 | awk '{print \$1}' | xargs -r docker rmi"
                    }
                }
            }
        }
    }
}
