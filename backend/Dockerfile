FROM python:3.8

# Optional: Place the app in the var/www directory
ENV CONTAINER_HOME=/var/www

# Add all files to the app directory
ADD . $CONTAINER_HOME

# Set the working directory
WORKDIR $CONTAINER_HOME

# Install required python dependencies
RUN pip install -r $CONTAINER_HOME/requirements.txt
