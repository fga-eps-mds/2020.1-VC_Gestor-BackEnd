docker stop user
docker rm user
docker run --name=user --restart unless-stopped -d -p 3000:3000 --network="ubuntu_backend" --ip="172.25.0.3" $1
docker cp private.json user:/usr/src/app/user/src/controller/private.json
docker system prune -a -f