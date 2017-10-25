docker-machine create --driver digitalocean --digitalocean-image ubuntu-16-04-x64 --digitalocean-access-token $DO_TOKEN engage-machine
docker-machine scp -r ./docker-stack.yml engage-machine:/home/engage/docker-stack.yml
docker-machine scp -r ./server/database/ engage-machine:/home/engage/server/
docker-machine scp -r ./devops/deploy-bot engage-machine:/home/engage/deploy-bot

docker-machine ssh engage-machine
cd /home/engage
chmod +x deploy-bot
chmod 755 deploy.sh
./deploy-bot &
