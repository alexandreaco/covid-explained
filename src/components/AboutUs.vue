<template>
  <div class="about-us">
    <p class="mb-4 text-2xl md:text-4xl font-light">
      We are a team of researchers and students at Brown, MIT, Harvard, Mass General and elsewhere. We care about getting information
      out there.
    </p>
    <h4 class="mb-4 text-xl md:text-3xl font-light">Contributors</h4>
    <table>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <!-- <td></td> -->
        </tr>
        <tr>
          <td class="cell name">Emily Oster</td>
          <td
            class="cell creds"
          >American economist, professor at Brown Univeristy, and bestselling author</td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Galit Alter</td>
          <td
            class="cell creds"
          >Professor of Medicine at Harvard Medical School and a Group Leader at the Ragon Institute of MGH, MIT and Harvard</td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Olivia Marks</td>
          <td class="cell creds">Web Development Engineer</td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Sarah Hsu</td>
          <td class="cell creds">
            Third year medical student at the Warren Alpert Medical School of
            Brown University and Master's student in Population Medicine
          </td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Jeff Hsiao</td>
          <td class="cell creds">Ph.D. Student at MIT and the Ragon Institute</td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Sofia Sacerdote</td>
          <td class="cell creds">
            Sophomore at Brown concentrating in American Studies with a focus in
            narratives of health, medicine, and trauma.
          </td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">David Wingate</td>
          <td class="cell creds">Research, writing, editing</td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Anagha Lokhande</td>
          <td class="cell creds">
            Recent Brown graduate and incoming MD candidate at Alpert Medical
            School
          </td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">James Okun</td>
          <td class="cell creds">
            Senior at Brown studying Applied Mathematics-Economics and Computer
            Science. He will be Predoctoral Fellow at MIT in June.
          </td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Nivea F. Luz</td>
          <td class="cell creds">
             Postdoctoral researcher at the Jamieson Lab in Brown University interested in understanding the inflammatory response in response to respiratory infections.
          </td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Nivea F. Luz</td>
          <td class="cell creds">
             Postdoctoral researcher at the Jamieson Lab in Brown University interested in understanding the inflammatory response in response to respiratory infections.
          </td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
        </tr>
        <tr>
          <td class="cell name">Township.agency</td>
          <td class="cell creds">Design and Development Support</td>
          <!-- <td class="cell links">
            [Other info? Social Media? Link to website?]
          </td>-->
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
.lead {
  font-size: 42px;
  line-height: 48px;
  font-weight: 100;
}

.about-us {
  max-width: 900px;
  padding: 0 20px;
}

.about-us p {
  margin: 2rem 0;
}
.cell {
  padding: 1rem 0;
}
.name {
  width: 150px;
  font-weight: 800;
  vertical-align: top;
}
.creds {
  width: 500px;
}

@media (max-width: 640px) {
  .name {
    width: 30%;
  }
  .creds {
    width: 70%;
  }
}
</style>
