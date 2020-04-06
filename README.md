# cy-webpack-plugin
A simple plugin which to run cypress after build and stop the test on failure
![npm](https://img.shields.io/npm/v/cy-webpack-plugin)
![npm](https://img.shields.io/npm/dm/cy-webpack-plugin)

## Installation
<pre>yarn add -D cy-webpack-plugin</pre>
![img](img/cy.jpg)

## Usage

```
const CyWebpackPlugin = require('cy-webpack-plugin');

module.exports = {
  plugins: [
    new CyWebpackPlugin()
  ]
}

// You don't need to forgot about 

 afterEach(function () {
         if (this.currentTest.state === 'failed') {
             throw Error();
         }
     });
```
## Options

|  Name | Default  | Description |
|:------------- |:---------------:| -------------:|
| countBuild     | 1 |    Run cypress after success build client, or you can pass 2(that mean run after build client and server |
| headed    | true |    If you want to see a cypress in window |
