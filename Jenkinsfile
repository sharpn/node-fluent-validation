@Library('jenkins-scripts')_

properties([pipelineTriggers([githubPush()])])

def config = new co.urban.NodeJSPackage.BuildConfig('node-validation')
config.environment = []
config.buildImage = 'urbanmassage/urban-build:node12-latest'
config.dependencies = []  

def build = new co.urban.NodeJSPackage.Build()
build.run(config)