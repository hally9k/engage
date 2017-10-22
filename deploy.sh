docker-machine scp -r /Users/hally9k/Repos/Engage/docker-stack.yml engage-machine:/home/engage/docker-stack.yml
docker-machine scp -r /Users/hally9k/Repos/Engage/server/database/ engage-machine:/home/engage/server/
dm ssh engage-machine
docker stack deploy --compose-file docker-stack.yml engage-stack
