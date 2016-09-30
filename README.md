# metemq-demo
Demo web server using metemq package

##index
* [Installation](#install)
* [Start](#start)
* [Notice](#notice)


<a name="install"></a>
##Installation

If you don't have [Meteor](https://www.meteor.com/) on your PC, install it first.

On Linux/macOS, use this line:

```bash
curl https://install.meteor.com/ | sh
```

If your PC installed meteor, clone this source code

```bash
git clone https://github.com/metemq/metemq-demo.git
```

And change directory to metemq-demo

```bash
cd metemq-demo
```

Next, npm installation

```bash
meteor npm install
```

Add MeteMQ package to yout Meteor project:

```bash
meteor add metemq:metemq
```


<a name="start"></a>
##Starting

Start demo server

```bash
meteor
```


<a name="notice"></a>
##Notice

if your PC spec is very low (eg. 1G ram), Occured build error.

When you occured build error, should be remove metemq package folder.

```bash
sudo rm -rf ~/.meteor/packages/metemq_metemq
```

and remove demo source code

then start first step
