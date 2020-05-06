<template>
  <div class="our-sources">
    <h3>Our Sources</h3>
    <p>
      These are a list of the sources we used to...
    </p>
    <h4>Contributors</h4>
    <table>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="cell name">[Source Name]</td>
          <td class="cell creds">
            [Source Description]
          </td>
          <td class="cell links">
            [Source Link]
          </td>
        </tr>
        <tr>
          <td class="cell name">[Source Name]</td>
          <td class="cell creds">
            [Source Description]
          </td>
          <td class="cell links">
            [Source Link]
          </td>
        </tr>
        <tr>
          <td class="cell name">[Source Name]</td>
          <td class="cell creds">
            [Source Description]
          </td>
          <td class="cell links">
            [Source Link]
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {};
  },
};
</script>

<style scoped>
.our-sources {
  max-width: 900px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
.our-sources p {
  margin:2rem 0;
}
.cell {
  padding: 10px;
}
.name {
  width: 150px;
}
.creds {
  width: 250px;
}
.links {
  width: 150px;
}
</style>
