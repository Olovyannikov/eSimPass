#!/bin/bash

export KUBECONFIG=./../infra/selectel/stand.gmdp.io/rke/kube_config_cluster.yml

./../infra/bin/helm upgrade -i app \
    --set reload=$(date -u +%Y-%m-%d_%H:%M:%S) \
    --set version=$1 \
    --set dns=toesim-dev.stand.gmdp.io \
    -n toesim-web-$2 \
    ./src/helm
    
