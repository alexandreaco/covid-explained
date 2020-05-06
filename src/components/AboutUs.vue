<template>

  <div class="about-us">

    <p class="lead">
      We are a team of researchers and students at Brown, MIT, Harvard, Mass General and elsewhere. We care about getting information
      out there.
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
            American economist, professor at Brown Univeristy, and bestselling author
          </td>
          <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>
        </tr>
        <tr>
          <td class="cell name">Galit Alter</td>
          <td class="cell creds">
            Professor of Medicine at Harvard Medical School and a Group Leader at the Ragon Institute of MGH, MIT and Harvard
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
      return {}
    }
  }

</script>

<style scoped>

.lead{
  font-size:42px;
  line-height: 48px;
  font-weight: 100;
}

  .about-us {
    max-width: 900px;
  }
  h3 {
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 24px;
    margin: 1rem 0;
  }
  .about-us p {
    margin: 2rem 0;
  }
  .cell {
    padding: 10px 0;
  }
  .name {
    width: 150px;
    font-weight: 800;
  }
  .creds {
    width: 250px;
  }
  .links {
    width: 150px;
  }

</style>
