<template>
  <div class="about-us">
    <h4>About Us</h4>
    <p>
      COVID-19 is confusing. There's a lot of conflicting information out there
      -- Can you get the virus from food? Is there such a thing as immunity?
      What kind of tests are really out there? Who is most at risk? And all the
      conflicting information can make it hard to make decisions, from whether
      to go to the grocery store to when to send your kids back to day care.
    </p>
    <p>
      We are a team of researchers and students at Brown, MIT, Harvard, Mass
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
  flex-direction: column;
}
.about-us p {
  text-align: center;
  width: 800px;
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
