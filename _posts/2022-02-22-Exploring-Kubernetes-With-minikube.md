## Exploring Kubernetes with minikube

[Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) is an open-source container orchestration platform originally developed at Google and donated to The Cloud Native Computing Foundation in 2014. If the name "Kubernetes" sounds like Greek to you, it's because it is; it means helmsman or pilot. You may see Kubernetes referred to as "K8s", this is short hand referencing the first and last letters of the name and the eight letters in-between.

It may seem intimidating to get exposure to Kubernetes, but all you need to get started is a laptop and [minikube](https://minikube.sigs.k8s.io/docs/start/). minikube is a local Kubernetes that is geared towards learning/development and can run on macOS, Linux, or Windows. 

### Installing minikube
To install minikube for you preferred OS and method, follow the instruction on [minikube.sigs.k8s.io](https://minikube.sigs.k8s.io/docs/start/).

### Starting minikube

To start your cluster, use the following command:
```
minikube start
```

To validate your Minikube cluster if running, run the following command:

```
minikube kubectl -- get pods --all-namespaces
```

If everything is functioning properly, you should see something similar to the following output (more on this later):

```
NAMESPACE     NAME                               READY   STATUS    RESTARTS        AGE
kube-system   coredns-64897985d-4xjjv            1/1     Running   0               4m22s
kube-system   etcd-minikube                      1/1     Running   0               4m34s
kube-system   kube-apiserver-minikube            1/1     Running   0               4m34s
kube-system   kube-controller-manager-minikube   1/1     Running   0               4m34s
kube-system   kube-proxy-r22lf                   1/1     Running   0               4m23s
kube-system   kube-scheduler-minikube            1/1     Running   0               4m34s
kube-system   storage-provisioner                1/1     Running   1 (3m51s ago)   4m32s
```
### Installing kubectl
`kubectl` is the command line tool used to interact with and control Kubernetes clusters. By default, `kubectl` stores configuration details in `$HOME/.kube/config` but alternate kubeconfig files can be specified with the `--kubeconfig` command line parameter or by using the `KUBECONFIG` environment variable.

The `kubeconfig` file for my minikube Kubernetes cluster contains the following information:

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority: /Users/sparkman/.minikube/ca.crt
    extensions:
    - extension:
        last-update: Sat, 26 Feb 2022 22:22:26 EST
        provider: minikube.sigs.k8s.io
        version: v1.25.2
      name: cluster_info
    server: https://192.168.59.100:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    extensions:
    - extension:
        last-update: Sat, 26 Feb 2022 22:22:26 EST
        provider: minikube.sigs.k8s.io
        version: v1.25.2
      name: context_info
    namespace: default
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    client-certificate: /Users/sparkman/.minikube/profiles/minikube/client.crt
    client-key: /Users/sparkman/.minikube/profiles/minikube/client.keyq
```

If you don't want to type `minikube kubectl --` before every command when you want to interact with your minikube cluster, you can install `kubectl` using the instructions on [kubernetes.io](https://kubernetes.io/docs/tasks/tools/)
or by adding the following alias to your `.bashrc` or `.zshrc` file:

```
alias kubectl="minikube kubectl --"
```

If you've done either of the above, you should be able to now run the command `kubectl get pods --all-namespaces` and get similar results to earlier; the main difference should be the age of the pods.

```
NAMESPACE     NAME                               READY   STATUS    RESTARTS      AGE
kube-system   coredns-64897985d-4xjjv            1/1     Running   0             15m
kube-system   etcd-minikube                      1/1     Running   0             16m
kube-system   kube-apiserver-minikube            1/1     Running   0             16m
kube-system   kube-controller-manager-minikube   1/1     Running   0             16m
kube-system   kube-proxy-r22lf                   1/1     Running   0             15m
kube-system   kube-scheduler-minikube            1/1     Running   0             16m
kube-system   storage-provisioner                1/1     Running   1 (15m ago)   15m
```

### kubectl basics

Now lets talk about the command `kubectl get pods --all-namespaces` above and its output.

`kubectl` syntax is as follows:

```
kubectl [command] [TYPE] [NAME] [flags]
```

Where `command`, `TYPE`, `NAME`, and `flags` are:
* `command`: Specifies the [operation](https://kubernetes.io/docs/reference/kubectl/overview/#operations) used to interact with and manage Kubernetes resources and the cluster. Some common operations include:
	* `apply` - Apply a configuration change to a resource from a file or stdin.
	* `create` - Create one or more resources from a file or stdin.
	* `describe` - Display the detailed state of one or more resources.
	* `delete` - Delete resources either from a file, stdin, or specifying label selectors, names, resource selectors, or resources.
	* `get` - List one or more resources.
* `type`: Specifies the [resource type](https://kubernetes.io/docs/reference/kubectl/overview/#resource-types). Resource types are case-insensitive and can be singular, plural, or even abbreviated. For example, the following commands will yield identical results:
	* kubectl get pod mypod
	* kubectl get pods mypod
	* kubectl get po mypod
* `name`: Specifies the client-provided, case-sensitive name of a resource. 
* `flags`: Specifies optional flags. 

The [kubectl reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands) page and the [Kubernetes Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/) are great resources for understanding `kubectl` and its use-cases. 

The output of the `kubectl get pods --all-namespaces` command detailed above outputs the following fields:
* `Namespace` - name of the [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) the pod belongs to.
* `Name` - name of the pod, which can end with a randomized string.
* `Ready` - how many of the expected pods are available to serve requests.
* `Status` - which phase of the pod [lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/) the pod is in. 
* `Restarts` -  how many times a pod has [restarted](https://dwdraju.medium.com/a-pod-restarts-so-whats-going-on-fa12bb8a57ea) since its creation.
* `Age` - the age of the pod. 



