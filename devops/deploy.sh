docker stack deploy --compose-file /home/engage/docker-stack.yml engage-stack
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
