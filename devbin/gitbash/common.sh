export SANDBOX="$(dirname $0)/../../../.."
source $(dirname $0)/.sandbox.env
export SCBUILD=$SANDBOX/build
source $SANDBOX/build.local/gitbash.env
export ANTJAR="$SCBUILD/lib/ant-launcher.jar"
export JAVA=$JAVA_HOME/java
source $(dirname $0)/.env