<script>
import { Protocol } from '@openclinical/proformajs'
import { PerformProtocol } from '@openclinical/proformajs-vue3-perform'

const template = {
  class: 'Plan',
  meta: {
    svg: {
      width: 800,
      height: 400
    }
  },
  caption: 'Plan',
  name: 'plan',
  autonomous: true
}

function checkTaskMeta(plan) {
  if (plan.tasks) {
    for (const [idx, task] of plan.tasks.entries()) {
      if (!task.meta || !task.meta.pos) {
        if (!task.meta) {
          task.meta = {}
        }
        task.meta.pos = {
          x: 80 + idx * 80,
          y: 80
        }
      }
      if (task.tasks) {
        checkTaskMeta(task)
      }
    }
  }
}

function checkMeta(protocol) {
  if (!protocol.meta || !protocol.meta.svg) {
    if (!protocol.meta) {
      protocol.meta = {}
    }
    protocol.meta.svg = {
      width: 800,
      height: 400
    }
  }
  if (protocol.tasks) {
    checkTaskMeta(protocol)
  }
}

export default {
  components: {
    'p-protocol': PerformProtocol
  },
  data: function () {
    return {
      protocol: new Protocol.Plan(template),
      selectedtask: template.name,
      initialData: {},
      tabIndex: 0
    }
  },
  created: function () {
    fetch('./demo.json')
      .then((data) => data.json())
      .then((json) => {
        this.protocol = new Protocol.Plan(json)
        this.selectedtask = this.protocol.name
      })
    const urlParams = new URLSearchParams(window.location.search)
    for (let entry of urlParams.entries()) {
      this.initialData[entry[0]] = JSON.parse(entry[1])
    }
  },
  computed: {
    startData() {
      let result = {}
      if (this.initialData && Object.keys(this.initialData).length > 0) {
        result[this.protocol.name] = this.initialData
      }
      return result
    }
  },
  methods: {
    updateProtocol(e) {
      checkMeta(e.value)
      this.protocol = e.value
      if (e.selected) {
        this.selectedtask = e.selected
      }
      try {
        this.protocol.getComponent(this.selectedtask)
      } catch (e) {
        // drop back to root path in case of error, assumed caused by name changes
        this.selectedtask = this.protocol.name
      }
    },
    resetProtocol(clazz) {
      if (clazz && ['Action', 'Decision', 'Enquiry'].indexOf(clazz) > -1) {
        let proto = new Protocol[clazz]({
          name: clazz.toLowerCase(),
          caption: clazz,
          meta: { svg: { width: 400, height: 200 }, pos: { x: 190, y: 100 } }
        })
        this.protocol = proto
        this.selectedtask = clazz.toLowerCase()
      } else {
        this.protocol = new Protocol.Plan(template)
        this.selectedtask = template.name
      }
    },
    updateSelectedTask(evt) {
      this.selectedtask = evt.value
    }
  }
}
</script>

<template>
  <div id="app">
    <main role="main">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <div class="container-fluid">
          <div class="navbar-brand">PRO<em>formajs</em></div>
        </div>
      </nav>
      <div class="container-fluid">
        <p-protocol
          :protocol="protocol"
          :debug="true"
          :initialData="startData"
          :template="
            protocol && protocol.meta && protocol.meta.enact && protocol.meta.enact.template
              ? protocol.meta.enact.template
              : 'compact'
          "
        />
      </div>
    </main>
  </div>
</template>

<style>
.clickable {
  cursor: pointer;
}

/* Popper.js does not support margin */
.dropdown-menu {
  margin: 0 !important;
}
</style>
