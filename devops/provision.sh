docker-machine create --driver digitalocean --digitalocean-image ubuntu-16-04-x64 --digitalocean-access-token $DO_TOKEN engage-machine

# Set new IP in DNS

docker-machine ssh engage-machine
docker swarm init --advertise-addr=$IP
mkdir /home/engage
mkdir /home/engage/server
exit

docker-machine scp ./docker-stack.yml engage-machine:/home/engage/docker-stack.yml
docker-machine scp -r ./server/database/ engage-machine:/home/engage/server/
docker-machine scp ./devops/deploy-bot engage-machine:/home/engage/deploy-bot
docker-machine scp ./devops/deploy.sh engage-machine:/home/engage/deploy.sh
docker-machine scp ./devops/deploy-bot.service engage-machine:/etc/systemd/system/deploy-bot.service


docker-machine ssh engage-machine

chmod +x /home/engage/deploy.sh
chmod +x /home/engage/deploy-bot
systemctl enable deploy-bot
systemctl start deploy-bot
