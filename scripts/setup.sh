#!/bin/bash
# Chill installation script

##### Constants #####
DEFAULT_NAME="chill"
DEFAULT_VERSION="v1.0.0-beta.1"
CHILL_CONFIG="$(pwd)/chill/chill.yml"

FOLDER_CHILL_MONITOR="chill"
FOLDER_CHILL_REST_API="chill-rest-api"
FOLDER_CHILL_DASHBOARD="chill-dashboard"

REQUIRED_PROGRAMS=("node" "yarn" "git" "pm2")

LINK_CHILL_MONITOR="https://github.com/leapfrogtechnology/chill.git"
LINK_CHILL_REST_API="https://github.com/leapfrogtechnology/chill-rest-api.git"
LINK_CHILL_DASHBOARD="https://github.com/leapfrogtechnology/chill-dashboard.git"


##### Variables #####
serviceUrls=()
serviceNames=()

wsPort=""
apiPort=""
logoUrl=""
domainName=""
slackEndpoint=""
slackEnabled=false
name=$DEFAULT_NAME
version=$DEFAULT_VERSION


##### Functions #####
# Replace string in file.
replace_string() {
  sed -i '' "s|$1|$2|g" $3
}

# Check the existence of the program.
has_program() {
  if type $1 > '/dev/null'; 
  then 
    return 0;
  fi

  return 1;
}

# Install npm packages for the folder.
install_packages() {
  cd $1;
  yarn --pure-lockfile;
  cd -;
}

# Start the build script for given repository.
build() {
  cd $1;
  CHILL_CONFIG=$CHILL_CONFIG yarn build;
  cd -;
}

# Checkout the repository version to given tag.
checkout() {
  cd $1;
  git checkout tags/$2;
  cd -;
}

# Take all the required inputs from the user for chill.yml.
read_inputs() {
  read -p "Chill Version: ($version) " version
  version=${version:-$DEFAULT_VERSION}

  read -p "Name of the project (lowercased without any spaces): ($name) " name
  name=${name:-$DEFAULT_NAME}

  read -p "API Port: " apiPort
  read -p "Websocket Port: " wsPort
  read -p "Domain name: (eg. chill.lftechnology.com) " domainName
  read -p "Would you like to enable Slack notifications?: (y/n) " enableNotification

  if [ "$enableNotification" = "y" ]; 
  then 
    slackEnabled=true;
  else 
    slackEnabled=false;
  fi

  if $slackEnabled;
  then
    read -p "Enter slack endpoint (eg. /T11Q734UA/BEZ1YK136/ZImB2wheUbYKbSrMJ32WnRlO): " slackEndpoint;
  fi

  read -p "Project logo Url: " logoUrl;

  while true; do
    read -p "Enter the URL of the service you would like to monitor: " serviceUrl
    read -p "Enter the Name of this service: " serviceName
    serviceUrls+=($serviceUrl)
    serviceNames+=($serviceName)

    read -p "Would you like to add her service?: (y/n) " addNewService
    if ! [ "$addNewService" = "y" ]; 
    then 
      break
    fi
  done
}

# Check programs required for chill installation.
check_programs() {
  for i in "${REQUIRED_PROGRAMS[@]}"
  do
    if ! has_program $i;
    then
      echo "chill: Please install '"$i"' to continue the installation process.";
      exit 0;
    fi
  done
}

# Clone all the repositories required for Chill.
clone_repositories() {
  git clone $LINK_CHILL_MONITOR;
  git clone $LINK_CHILL_REST_API;
  git clone $LINK_CHILL_DASHBOARD;
}

# Switch chill version to the one supplied by the user.
switch_chill_version() {
  checkout $FOLDER_CHILL_MONITOR $version;
  checkout $FOLDER_CHILL_REST_API $version;
  checkout $FOLDER_CHILL_DASHBOARD $version;
}

# Install all the dependencies for all the repositories.
install_dependencies() {
  install_packages $FOLDER_CHILL_MONITOR;
  install_packages $FOLDER_CHILL_REST_API;
  install_packages $FOLDER_CHILL_DASHBOARD;
}

# Create a chill config file and add database configuration.
create_chill_config_file() {
  cd $FOLDER_CHILL_MONITOR;

  # Remove default services in chill.yml.dist and create chill.yml.
  numberOfLines=$(wc -l < chill.yml.dist | xargs)
  head -n $(( numberOfLines - 2 )) chill.yml.dist >> chill.yml
  
  replace_string '8080' $wsPort $CHILL_CONFIG;
  replace_string './chill.db' "$(pwd)/chill.db" $CHILL_CONFIG;
  replace_string SLACK_WEBHOOK_ENDPOINT $slackEndpoint $CHILL_CONFIG;
  
  # Replace first occurence of false to provided slack config (good enough for now).
  sed -i '' -e "/false/{s//$slackEnabled/;:a" -e '$!N;$!ba' -e '}' chill.yml

  # Add services
  serviceNamesLength=${#serviceNames[@]}
  for (( i=1; i<${serviceNamesLength}+1; i++ ));
  do
    echo "  - name: ${serviceNames[$i-1]}" >> chill.yml
    echo "    url: ${serviceUrls[$i-1]}" >> chill.yml
  done

  # Add new entry "restApi" to chill.yml.
  echo "" >> chill.yml;
  echo "restApi:" >> chill.yml;
  echo "  port: $apiPort" >> chill.yml;

  cd -;
}

# Create a .env file for chill dashboard.
create_dot_env_file() {
  cd $FOLDER_CHILL_DASHBOARD;
  cp .env.example .env;

  replace_string "{APP_LOGO}" $logoUrl ./.env;
  replace_string "{LOGO_HEIGHT}" "80px" ./.env;
  replace_string "{APP_TITLE}" "Chill $name" ./.env;
  replace_string "{API_ENDPOINT}" "https://$domainName" ./.env;
  replace_string "{WEBSOCKET_ENDPOINT}" "wss://$domainName" ./.env;

  cd -;
}

# Run migration scripts to initialize chill.db for Chill monitor.
migrate_database() {
  cd $FOLDER_CHILL_MONITOR;
  yarn migrate;
  cd -;
}

# Run build scripts in all services.
build_services() {
  build $FOLDER_CHILL_MONITOR;
  build $FOLDER_CHILL_REST_API;
  build $FOLDER_CHILL_DASHBOARD;
}

# Start all the services.
start_services() {
 CHILL_CONFIG=$CHILL_CONFIG pm2 start $FOLDER_CHILL_MONITOR/dist/index.js --name $name-monitor;
 CHILL_CONFIG=$CHILL_CONFIG pm2 start $FOLDER_CHILL_REST_API/dist/index.js --name $name-rest-api;
 pm2 save;
}

# Print message for API urls and dashboard path.
show_message() {
  echo
  echo "----------------------------------------------------------"
  echo "  Chill is up in the following local addresses: ";
  echo
  echo "  Rest API: http://localhost:$apiPort";
  echo "  Websocket: http://localhost:$wsPort";
  echo "  Dashboard: $(pwd)/$FOLDER_CHILL_DASHBOARD/dist/index.js"
  echo "----------------------------------------------------------"
}


##### Main #####
check_programs
read_inputs
clone_repositories
switch_chill_version
install_dependencies
create_chill_config_file
create_dot_env_file
migrate_database
build_services
start_services
show_message
