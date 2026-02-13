What I learned and did in the past week:

I create a simple app with an api and a db 

Postgres + Nodejs + Docker + Docker Compose  

postgresql is a relational db

rest api is a way to communicate with the db , get post delete etc

i dockerized the app and learned that i can run multiple containers at once with docker compose

Next, i created a kubernetes cluster with kind

steps to add todo app to kubernetes cluster:

1. build the docker image
2. create k8s cluster
3. load the image into the cluster
4. check image ok

Basically i created a deployment yaml something like a docker compose file where i instructed k8s to run the app 

apply manifets file and that s it 

*more to read 


On day 3 I added Ingress to the cluster so it can connect to the outside and expose it with a hostname (todo.local)

on day 4 i learned about ci vs cd, added lint check , build and then the push to docker registry

day 5 i tagged the image with the commit hash 

