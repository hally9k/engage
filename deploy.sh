# - docker-machine create --driver digitalocean --digitalocean-image ubuntu-16-04-x64 --digitalocean-access-token $DO_TOKEN engage-machine
# - docker-machine scp -r /Users/hally9k/Repos/Engage/docker-stack.yml engage-machine:/home/engage/docker-stack.yml
# - docker-machine scp -r /Users/hally9k/Repos/Engage/server/database/ engage-machine:/home/engage/server/
docker-machine ssh engage-machine
cd /home/engage
docker stack deploy --compose-file docker-stack.yml engage-stack
