docker stop resolution
docker rm resolution
docker run --name=resolution --restart unless-stopped -d -p 3002:3002 --network="ubuntu_backend" --ip="172.25.0.4" $1
docker system prune -a -f