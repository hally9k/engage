docker-machine create --driver digitalocean --digitalocean-image ubuntu-16-04-x64 --digitalocean-access-token $DO_TOKEN engage-machine

docker-machine ssh engage-machine
mkdir /home/engage
mkdir /home/engage/server
exit

docker-machine scp -r ./docker-stack.yml engage-machine:/home/engage/docker-stack.yml
docker-machine scp -r ./server/database/ engage-machine:/home/engage/server/
docker-machine scp -r ./devops/deploy-bot engage-machine:/home/engage/deploy-bot

docker-machine ssh engage-machine

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
chmod 755 /home/engage/deploy-bot/deploy.sh
npm i -g pm2
cd ./deploy-bot
pm2 start /home/engage/deploy-bot/index.js
exit
