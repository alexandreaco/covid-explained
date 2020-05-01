<template>
  <div class="about-us">
    <h4>About Us</h4>
    <p>
      We are team of researchers and students at Brown, MIT, Harvard, Mass
      General and elsewhere. We care about getting information out there.
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
          <td class="cell name">Emily Oster</td>
          <td class="cell creds">
            American economist, professor at Brown Univeristy, and bestselling
            author
          </td>
          <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>
        </tr>
        <tr>
          <td class="cell name">Galit Alter</td>
          <td class="cell creds">
            Professor of Medicine at Harvard Medical School and a Group Leader
            at the Ragon Institute of MGH, MIT and Harvard
          </td>
          <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>
        </tr>
        <tr>
          <td class="cell name">Olivia Marks</td>
          <td class="cell creds">Web Development Engineer</td>
          <td class="cell links">
            [Other info? Social Media? Link to website?]
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
.about-us {
  margin-left: 150px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
