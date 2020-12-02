docker stop news
docker rm news
docker run --name=news --restart unless-stopped -d -p 3004:3004 --network="ubuntu_backend" --ip="172.25.0.7" $1
docker system prune -a -f