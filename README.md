You can view my project as it's still in production here!
https://fridgedaddy.byfaithx.com

You can view my project's figma here!
https://www.figma.com/file/FPNjksnqAasKZUIfgyLvtZ/FridgeDaddy_v2?node-id=2%3A439&t=KLTaMQBRuAoe4fmZ-1

### STEPS TO BUILD DOCKER IMAGE

we need to use buildx with --platform=linux/amd64 due to
[reason linked here](https://blog.jaimyn.dev/how-to-build-multi-architecture-docker-images-on-an-m1-mac/)

#### > copy and paste to Terminal

(1)

```sh
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/i3a8p9r2
```

(2)

```sh
docker buildx build --platform=linux/amd64 -t fridgedaddy-linux .
```

```sh
docker tag fridgedaddy-linux:latest public.ecr.aws/i3a8p9r2/fridgedaddy:latest-linux
```

```sh
docker push public.ecr.aws/i3a8p9r2/fridgedaddy:latest-linux
```

alternatively instead of (2), you can join the commands together

(2 -alternative)

```sh
docker buildx build --platform=linux/amd64 -t public.ecr.aws/i3a8p9r2/fridgedaddy-linux:latest .
```
