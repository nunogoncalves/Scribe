<h1>Papyrus</h1>

<p align="center">
  <img style="align: center" src="http://592f46.medialib.glogster.com/media/be62a2c82903517b5bd81f46f72ee758184be12d3e60218f70f1a5bcdcb6505a/papirus.jpg"/>

  <h3>Linkedcare APIs Documentation Gateway</h3>
</p>

---


This application comunicates with all linkedcare API services in order to get necessary information to properly display documentation about those APIs. Linkedcare documentation is centralized in this project.

<h4>How to use it</h4>
- install sinatra
- git clone git@github.com:croudcare/papyrus.git
- cd into the project folder
- rackup
- localhost:9292

---

For an API to be documented using this application, it must follow the following protocol.

Papyrus uses a json file, in which it keeps track of all APIS it communicates with to get documentation. You need to edit the file sources.json (which is outside the version control, but it has a symbolic link).

Papyrus documents three things: APIs endpoints, broadcasts (messages the service might send to linkbus) and gems. Documenting gems used by a given project allow its maintence to be easier and probably avoids having gems that are not used at all.

You need to provide the following keys:
 - name -> The name of the API.
 - shortName -> Shorter version of the name (like 3 letters)
 - gems_url -> The service that runs the api, must have a json file with the gems listed, and this url should point to it.
 - broadcasts_url -> Similar to the gems json file, the same is needed for broadcasts.
 - api_docs_url -> This endpoint points to a json file, or a json response entpoint that documents the whole api.

Both the gems.json and broadcasts.json files must follow a contract defined later in this read me.

To begin, add a service to the sources.json file in papyrus. Below is an example of a service:

```json
{
  "services": [
    {
      "api_docs_url": "http://localhost:3000/docs/api.json",
      "broadcasts_url": "http://localhost:3000/docs/broadcasts.json",
      "gems_url": "http://localhost:3000/docs/gems.json",
      "name": "PatientFile",
      "shortName": "pfs",
      "icon": "patient_file"
    },
  ]
}
```

Now Papyrus will try to communicate with your API's service. Note that the way they communicate is through ajax requests, so you need to setup cors to allow your service to respond.

---
<h3>Broadcasts</h3>
In the broadcasts location you provided Papurys, have a json file with the following information about each broadcast:

- broadcaster -> The name of the service which is broadcasting the message (this was done with a first approach in mind (broadcast oriented implementation)).
- routingKey -> patient_file.create  this is the routing key of the message
- payload_content_type -> type of message content
- payload_data -> examples of messages contents so that the receiver knows what to expect. If this is a json, any keys will be allowed.

Bellow is an example of a file:

```json
{
  "broadcasts": [
    {
      "broadcaster": "PatientFileService",
      "routingKey": "patient_file.create",
      "payload_content_type": "json",
      "payload_data":
      {
        "id": "id of the patient file created",
        "name": "name of the patient file created"
      }
    }, {
      "broadcaster": "MedLocker",
      "routingKey": "patient_medicine.create",
      "payload_content_type": "json",
      "payload_data":
      {
        "id": "id of the patient medicine created",
        "patient_id": "id of the patient who this medicine belongs to",
        "patient_name": "name of the patient",
        "doctor_name": "name of the doctor"
      }
    }, {
        "broadcaster": "MedLocker",
        "routingKey": "patient.update",
        "payload_content_type": "integer",
        "payload_data": "1" //if it makes sense….
     }
  ]
}
```

<h3>Gems</h3>
The gems documentation is similar to broadcasts. It serves the purpose of allowing project gems maintenance easier. It would allow the manager to easily understand why the gem is used, and also to allow other to understand the purpose of that gem.

There are two types of information that need to be in the gem. Some that can be automatically filled (with some sort of task) and some that needs to be added by hand by the person who added the gem.

This link http://stackoverflow.com/a/5177807/919445  can provide information on how to get details of a gem. This could be used in a task to automatically load this information into a json file. The manual info, the developer who adds the gem, simply writes in the file. We’ll try to figure out a way of making this manual process a little bit more effective.

The file should have a root named gems which is an array of the gems information. Each object should have the following keys:

- name - gem name
- initial_version - version it had when it was first added to the project
- added_date - date it was initially added
- environments - environments this gem is used
- current_version - current version in the project
- last_updated_date - date of last update
- link - link to the gem info (github for example)
- purpose - What does this gem do
- who - Developer who add this gem to the project
- why_this - Why this gem and not others, if any.
- origin_project - The project this was initially in (if the user copied the gem because it was originally   in another project)
dependencies - Dependencies the user would like to point (using the automatic way to build  technical extra info will probably have more info)
- tecnhical_extra_info - this is the information the gem provides. This can be of any type.

Here's an example:

```json
{
    "gems": [
      {
        "name": "validic",
        "initial_version": "0.3.1",
        "added_date": "2014-01-30",
        "current_version": "0.1.3",
        "environments": "development, stating, production",
        "link": "https://github.com/Validic/validic",
        "purpose": "This gem handles communication with Validic",
        "who": "Nuno Gonçalves",
        "why_this": "It’s provided by Validic to communicate with their services",
        "origin_project": "Sensors",
        "dependencies": [],
        "tecnhical_extra_info": "…"
      },
    ]
  }
```