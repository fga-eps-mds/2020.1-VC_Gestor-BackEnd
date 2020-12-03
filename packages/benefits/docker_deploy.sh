docker stop benefits
docker rm benefits
sudo docker run --name=benefits --restart unless-stopped -d -p 3003:3003 --network="ubuntu_backend" --ip="172.25.0.6" $1
docker system prune -a -f